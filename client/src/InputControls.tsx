import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './state/store'
import { setInputValue } from './state/inputTextSlice'
import { selectMediaRecorder, setIsRecording, setMediaRecorder } from './state/recorderSlice'
import { setTokensUsed } from './state/tokenSlice'
import { setChatMessages, setIsLoading } from './state/chatSlice'
import { Message } from './types'
import { Socket } from 'socket.io-client';

type InputControlsProps = {
    socket: Socket | null;
}

const InputControls: React.FC<InputControlsProps>= ({ socket }) => {
    const dispatch = useDispatch()
    const isRecording = useSelector((state: RootState) => state.recorder.isRecording)
    const inputValue = useSelector((state: RootState) => state.input.inputValue)
    const chatMessages = useSelector((state: RootState) => state.chat.chatMessages)
    const mediaRecorder = useSelector(selectMediaRecorder)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputValue(e.target.value));
    }

    const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Check if it was the Enter key that was hit
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            const newMessage: Message = {
                role: 'user',
                content: inputValue,
            };
            dispatch(setChatMessages([...chatMessages, newMessage]))
            dispatch(setIsLoading(true))

            socket!.emit('newMessage', [...chatMessages, newMessage], handleSubmitInputTextResponse)
            dispatch(setInputValue(''))
        }
    }

    const handleSubmitInputTextResponse = (response: any) => {
        setIsLoading(false)
        if (response.error) {
            console.error('Upload failed', response.error);
        } else {
            dispatch(setChatMessages(response.messages))
            dispatch(setTokensUsed(response.tokensUsed))
            dispatch(setIsLoading(false))
        }
    }

    const handleSubmitAudioResponse = (response: any) => {
        if (response.error) {
            console.error('Upload failed', response.error);
            return
        }
        dispatch(setChatMessages(response.messages))
        dispatch(setIsLoading(true))
        socket!.emit('newMessage', response.messages, (response: any) => {
            // We received a response from the server
            dispatch(setIsLoading(false))
            if (response.error) {
                console.error('Upload failed', response.error);
                return
            }
            dispatch(setChatMessages(response.messages))
            dispatch(setTokensUsed(response.tokensUsed))
        })
    }

    const handleStartStopRecording = () => {
        dispatch(setIsRecording(!isRecording));
        if (isRecording) {
            handleStopRecording();
        } else {
            handleStartRecording();
        }
    };

    const handleStartRecording = async () => {
        if (!navigator.mediaDevices) {
            console.log("getUserMedia not supported");
            return;
        }
    
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const options: MediaRecorderOptions = {};
            
            if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                options.mimeType = 'audio/webm;codecs=opus';
            } else if (MediaRecorder.isTypeSupported('audio/webm')) {
                options.mimeType = 'audio/webm';
            }
            
            const newMediaRecorder = new MediaRecorder(stream, options);
    
            newMediaRecorder.ondataavailable = async (e) => {
                await sendDataToServer([e.data]);
            };
    
            newMediaRecorder.onstop = async () => {
                console.log('stop media recorder event');
            };
    
            newMediaRecorder.start();
            console.log(`MediaRecorder state after start: ${newMediaRecorder.state}`);
    
            dispatch(setMediaRecorder(newMediaRecorder));
        } catch (error) {
            console.error('Error accessing microphone: ', error);
        }
    };
    
    const handleStopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            console.log(`MediaRecorder state after stop: ${mediaRecorder.state}`);
        }
    };

    const sendDataToServer = async (data: Blob[]) => {
        const blob = new Blob(data, { type: 'audio/webm' });
      
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = (reader.result as string).split(",")[1];
          
          if (socket) {
            console.log('trying to emit audio')
            setIsLoading(true)
            socket.emit('uploadAudio', {audioFile: base64Audio, messages: chatMessages }, handleSubmitAudioResponse);
          }
        };
        reader.readAsDataURL(blob);
      };

    return (
        <div className="controls">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputSubmit}
                placeholder="Type a message..."
            />
            <div
                className={`record-button ${isRecording ? 'recording' : ''}`}
                onClick={handleStartStopRecording}
            >
                🎙️
            </div>
        </div>
    );
};

export default InputControls;
