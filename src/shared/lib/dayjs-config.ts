import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

dayjs.tz.setDefault('Asia/Seoul');
const dayjsKST = (date?: dayjs.ConfigType) => dayjs(date).tz('Asia/Seoul');

export { dayjsKST };
