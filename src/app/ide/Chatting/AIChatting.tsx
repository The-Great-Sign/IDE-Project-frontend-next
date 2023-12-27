import React, { useState } from 'react';
import {
  AIChattingDiv,
  ChattingMessages,
  ChattingMessage,
  ChattingName,
  ChattingContent,
  ChattingInputForm,
  ChattingInput,
  ChattingSendButton,
  // CodeReviewBtn,
} from './Chatting.styles';
import axios from 'axios';
import { AIType, useAIChatStore } from '@/store/useChattingStore';

const AIChatting = () => {
  const [question, setQuestion] = useState<string>('');
  const AImessages = useAIChatStore(state => state.AImessages);

  const postSimpleQuestion = async (question: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/chatgpt/ask`,
        {
          question: question,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );
      const data = response.data;
      if (data.success) {
        useAIChatStore.getState().addAIMessage(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const postCodeReview = async (fileId: string) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/chatgpt/review-file/${fileId}`,
  //       {},
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Access-Control-Allow-Origin': '*',
  //           Authorization: localStorage.getItem('accessToken'),
  //         },
  //       }
  //     );
  //     const data = response.data;
  //     if (data.success) {
  //       useAIChatStore.getState().addAIMessage(data);
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const questionMessage = {
      success: true,
      message: '질문',
      results: question,
    };
    useAIChatStore.getState().addAIMessage(questionMessage);
    postSimpleQuestion(question);
    setQuestion('');
  };

  // const handleReview = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   postCodeReview(fileId);
  // };

  return (
    <AIChattingDiv>
      <ChattingMessages>
        {AImessages.map((AImessage: AIType, index: number) => {
          const { message, results } = AImessage;
          return (
            <ChattingMessage key={index}>
              {message == '질문' ? (
                <>
                  <ChattingName>나</ChattingName>
                  <ChattingContent>{results}</ChattingContent>
                </>
              ) : (
                <>
                  <ChattingName>Chat GPT</ChattingName>
                  <ChattingContent>{results}</ChattingContent>
                </>
              )}
            </ChattingMessage>
          );
        })}
      </ChattingMessages>

      <ChattingInputForm onSubmit={handleSubmit}>
        <ChattingInput
          placeholder="채팅을 입력하세요"
          value={question}
          onChange={handleQuestion}
        />
        <ChattingSendButton type="submit">전송</ChattingSendButton>
      </ChattingInputForm>
      {/* <CodeReviewBtn onClick={handleReview} type='button'>코드 리뷰</CodeReviewBtn> */}
    </AIChattingDiv>
  );
};

export default AIChatting;
