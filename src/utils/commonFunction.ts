// 通用函数
import useClipboard from 'vue-clipboard3';
import { ElMessage } from 'element-plus';
import { formatDate } from '/@/utils/formatTime';
import { useI18n } from 'vue-i18n';

export default function () {
	const { t } = useI18n();
	const { toClipboard } = useClipboard();

	// 百分比格式化
	const percentFormat = (row: EmptyArrayType, column: number, cellValue: string) => {
		return cellValue ? `${cellValue}%` : '-';
	};
	// 列表日期时间格式化
	const dateFormatYMD = (row: EmptyArrayType, column: number, cellValue: string) => {
		if (!cellValue) return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd');
	};
	// 列表日期时间格式化
	const dateFormatYMDHMS = (row: EmptyArrayType, column: number, cellValue: string) => {
		if (!cellValue) return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS');
  };
  // 列表日期时间格式化
	const dateFormatYMDHMST = (cellValue: number) => {
		if (!cellValue) return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS');
	};
	// 列表日期时间格式化
	const dateFormatHMS = (row: EmptyArrayType, column: number, cellValue: string) => {
		if (!cellValue) return '-';
		let time = 0;
		if (typeof row === 'number') time = row;
		if (typeof cellValue === 'number') time = cellValue;
		return formatDate(new Date(time * 1000), 'HH:MM:SS');
	};
	// 小数格式化
	const scaleFormat = (value: string = '0', scale: number = 4) => {
		return Number.parseFloat(value).toFixed(scale);
	};
	// 小数格式化
	const scale2Format = (value: string = '0') => {
		return Number.parseFloat(value).toFixed(2);
	};
	// 点击复制文本
	const copyText = (text: string) => {
		return new Promise((resolve, reject) => {
			try {
				//复制
				toClipboard(text);
				//下面可以设置复制成功的提示框等操作
				ElMessage.success(t('message.layout.copyTextSuccess'));
				resolve(text);
			} catch (e) {
				//复制失败
				ElMessage.error(t('message.layout.copyTextError'));
				reject(e);
			}
		});
  };
  //获取今天/n天的时间范围数组,比如2024-01-01 00:00:00和2024-01-01 23:50:00
  const returnTimeRangeString = (n: any) => {
    const now = new Date().getTime();
    const endStr = dateFormatYMDHMST(now)
    const startStr = dateFormatYMDHMST(now-n*24*60*60*1000)
    const timeStrBegin=startStr.slice(0, 11) + '00:00:00'
    const timeStrEnd=endStr.slice(0, 11) + '23:50:00'
    return [timeStrBegin, timeStrEnd];
  };
  //获取现在时刻的时间范围数组,比如2024-01-01 08:00:00和2024-01-01 12:00:00
  const returnTimeString = (n: any = 4) => {
    const now = new Date().getTime();
    const preTime = now - n * 60 * 60 * 1000;
    const afterTime = now + n * 60 * 60 * 1000;
    const preTimeStr = dateFormatYMDHMST(preTime);
    const afterTimeTimeStr = dateFormatYMDHMST(afterTime);
    return [preTimeStr.slice(0, 15) + '0:00', afterTimeTimeStr.slice(0, 15) + '0:00'];
  };
  //生成[‘00:00’,‘00:10’,..,‘23:50’]数组
  const getHouelyTimeArray = () => { 
    let timeArray = []
    for (let hour = 0; hour < 24; hour++) { 
      for (let minute = 0; minute < 60; minute += 10) { 
        let timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        timeArray.push(timeString)
      }
    }
    return timeArray
  }
  //生成[‘2024-01-01 08:10’,...,‘2024-01-12 12:10’]数组
  const getTimeArrayFormDateArray=(dateArray:any)=>{ 
    let timeArray = []
    const startDate = new Date(dateArray[0])
    const endDate = new Date(dateArray[1])
    while (startDate<=endDate) { 
      timeArray.push(startDate.toISOString().replace('T', ' ').substring(0, 16))
      startDate.setMinutes(startDate.getMinutes()+10)
    }
    return timeArray
  }
	return {
		percentFormat,
		dateFormatYMD,
    dateFormatYMDHMS,
    dateFormatYMDHMST,
		dateFormatHMS,
		scaleFormat,
		scale2Format,
    copyText,
    returnTimeRangeString,
    returnTimeString,
    getHouelyTimeArray,
    getTimeArrayFormDateArray,
	};
}
