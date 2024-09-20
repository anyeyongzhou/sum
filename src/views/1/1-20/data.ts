const API_BASE = '/online_user';

const API_SUFFIXES = {
	/** 在线用户实时流动 */
	STREAM_SSE: '/user-activity-sse',
	/** 省略其他接口 */
};

export class OnlineUserAPI {
	/**
	 * 在线用户实时数据展示
	 */
	static STREAM_SSE = {
		endpoint: (token: string) => {
			return `${import.meta.env.VITE_APP_API_URL}${API_BASE}${API_SUFFIXES.STREAM_SSE}?Authorization=${token}`;
		},
		permission: 'monitor:online-user:list',
		chartOptions: (): any => {
			return {
				title: {
					text: '在线用户统计', // 图表标题
					left: 'center', // 标题居中显示
				},
				xAxis: {
					type: 'category',
					data: ['35s', '30s', '25s', '20s', '15s', '10s', '5s'], // 可以根据需要修改为时间段或其他表示
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						data: ['0', '0', '0', '0', '0', '0', '0'], // 数据
						type: 'line',
					},
				],
			};
		},
	};
}
