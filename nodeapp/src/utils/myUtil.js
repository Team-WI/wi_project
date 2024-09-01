export function addHour(transDate){
	
	const originalDate = new Date(transDate);

	// 9시간을 밀리초로 변환 (9시간 * 60분 * 60초 * 1000밀리초)
	const nineHoursInMilliseconds = 9 * 60 * 60 * 1000;

	// 9시간 더하기
	const newDate = new Date(originalDate.getTime() + nineHoursInMilliseconds);
	
	// 연도, 월, 일, 시간, 분, 초 추출 및 포맷팅
	const year = newDate.getFullYear();
	const month = String(newDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
	const day = String(newDate.getDate()).padStart(2, '0');
	const hours = String(newDate.getHours()).padStart(2, '0');
	const minutes = String(newDate.getMinutes()).padStart(2, '0');
	const seconds = String(newDate.getSeconds()).padStart(2, '0');

	// 원하는 형식으로 조합
	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	
	return formattedDate;
	
}