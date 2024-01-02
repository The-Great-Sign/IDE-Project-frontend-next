import axiosInstance from '../axiosInstance';
import { getCurrentProjectId } from '../websocket';

export interface NodeResponseProps {
  success: boolean;
  message: string;
  results: { name: string };
}

export const fetchProjectName = async (): Promise<NodeResponseProps> => {
  try {
    const response = await axiosInstance.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URI
      }/api/projects/${getCurrentProjectId()}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: localStorage.getItem('accessToken'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error occurred',
      results: { name: '' },
    };
  }
};
