export const formatDateString = (inputDateString: string) => {
  // ISO 8601 형식의 입력을 Date 객체로 변환
  const date = new Date(inputDateString);

  // 날짜 포맷팅
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // 오전/오후 구분
  const ampm = hours >= 12 ? '오후' : '오전';
  const formattedHour = hours % 12 || 12;

  // 최종 포맷팅된 문자열 반환
  return `${year}.${month}.${day}. ${ampm} ${formattedHour}:${minutes}`;
};
