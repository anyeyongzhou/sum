<template>
	<div class="calendar-table">
		<div class="table-container">
			<div class="table-grid">
				<!-- Table Header -->
				<div class="table-row header-row">
					<div class="table-cell diagonal-cell">
						<span class="top-content">日</span>
						<span class="bottom-content">月</span>
					</div>
					<div class="table-cell" v-for="(day, index) in daysInMonth" :key="`header-${index}`">
						{{ day }}
					</div>
				</div>

				<!-- Table Body -->
				<div class="table-row" v-for="(monthData, rowIndex) in calendarData" :key="`row-${rowIndex}`">
					<div class="table-cell month-cell">
						{{ monthNames[rowIndex] }}
					</div>
					<div
						class="table-cell day-cell"
						v-for="day in 31"
						:key="`cell-${rowIndex}-${day}`"
						:class="{
							'has-data': monthData[day],
							highlighted: isCellHighlighted(rowIndex + 1, day),
						}"
						@mouseover="highlightCell(rowIndex + 1, day)"
						@mouseout="clearHighlight"
					>
						<span>{{ monthData[day] || 0 }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Constants
const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const daysInMonth = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

// Sample data
const rawData = {
	'3': { '9': 1 },
	'4': { '12': 2 },
	'5': { '11': 1, '12': 2, '21': 1 },
	'6': { '6': 5, '8': 1, '9': 2, '10': 1, '12': 2, '17': 1, '20': 1 },
	'7': { '1': 8, '4': 1, '7': 1, '6': 1, '13': 1, '22': 1, '25': 1, '26': 1, '27': 1, '29': 6, '30': 1 },
	'8': { '1': 1, '2': 2, '7': 1, '20': 1, '24': 1, '27': 1, '31': 1 },
	'9': { '15': 1, '17': 9, '21': 2 },
	'10': { '23': 1 },
};

// Reactive state
const calendarData = ref<Record<number, number>[]>([]);
const highlightedRow = ref<number | null>(null);
const highlightedColumn = ref<number | null>(null);

// Parse the raw data into calendar format
const parseCalendarData = (data: Record<string, Record<string, number>>) => {
	return Array.from({ length: 12 }, (_, monthIndex) => {
		const monthKey = (monthIndex + 1).toString();
		return data[monthKey] ? { ...data[monthKey] } : {};
	});
};

// Check if cell should be highlighted
const isCellHighlighted = (row: number, col: number) => {
	return highlightedRow.value === row || highlightedColumn.value === col;
};

// Highlight cell and its row/column
const highlightCell = (row: number, col: number) => {
	highlightedRow.value = row;
	highlightedColumn.value = col;
};

// Clear highlights
const clearHighlight = () => {
	highlightedRow.value = null;
	highlightedColumn.value = null;
};

// Initialize component
onMounted(() => {
	calendarData.value = parseCalendarData(rawData);
});
</script>

<style lang="scss" scoped>
.calendar-table {
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	padding: 1.8519vh 0.83vw 2.1296vh 1.09vw;

	.table-container {
		display: flex;
		flex: 1;
		box-sizing: border-box;
		overflow: hidden;
		color: #666666;

		.table-grid {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 100%;

			.table-row {
				display: flex;
				width: 100%;

				&.header-row {
					.table-cell:not(.diagonal-cell) {
						background-color: #eff5ff;
						padding: 1.9444vh 0 1.5741vh;
					}
				}

				.table-cell {
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					padding: 0.1vw;
					text-align: center;
					font-size: 0.78vw;
					border-top: 0.05vw solid #eeeeee;
					border-right: 0.05vw solid #eeeeee;
					min-height: 3.5vh;

					&.month-cell {
						width: 4.64vw;
						padding: 1.9444vh 0 1.2037vh;
						background-color: #eff5ff;
					}

					&.day-cell {
						width: 2.48vw;

						&.has-data {
							background-color: #6fa7ea;
							color: white;
						}

						&.highlighted:not(.has-data) {
							background-color: #eff5ff;
						}
					}

					&.diagonal-cell {
						position: relative;
						width: 4.64vw;
						padding-bottom: 8px;
						background-color: #eff5ff;

						&::before {
							content: '';
							position: absolute;
							top: 0;
							left: 1px;
							width: 5.16vw;
							height: 1px;
							background-color: #e8e8e8;
							transform-origin: top left;
							transform: rotate(30.5deg);
						}

						.top-content {
							position: absolute;
							top: 0.2778vh;
							left: 2.67vw;
							font-size: 0.83vw;
						}

						.bottom-content {
							position: absolute;
							top: 2.2222vh;
							left: 0.83vw;
							font-size: 0.83vw;
						}
					}
				}
			}
		}
	}
}
</style>
