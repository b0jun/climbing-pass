import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

dayjs.tz.setDefault('Asia/Seoul');
const dayjsUTC = dayjs;

export { dayjsUTC };
