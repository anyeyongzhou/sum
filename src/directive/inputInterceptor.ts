// src/directive/inputInterceptor.ts
import type { App } from 'vue';
import { ElMessage } from 'element-plus';
import { defineComponent, h } from 'vue';

const SAFE_INPUT_PATTERNS = [
	{ pattern: /alert\(/gi, name: 'alert(' },
	{ pattern: /eval\(/gi, name: 'eval(' },
	{ pattern: /script>/gi, name: 'script>' },
	{ pattern: /onerror=/gi, name: 'onerror=' },
	{ pattern: /javascript:/gi, name: 'javascript:' },
	{ pattern: /@/gi, name: '@' },
];

export function setupInputInterceptor(app: App) {
	const originalInput = app.component('ElInput');

	if (!originalInput) return;

	const InterceptedInput = defineComponent({
		name: 'ElInput',
		inheritAttrs: false,
		props: {
			modelValue: {
				type: [String, Number],
				default: '',
			},
			placeholder: {
				type: String,
				default: '',
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			readonly: {
				type: Boolean,
				default: false,
			},
			clearable: {
				type: Boolean,
				default: false,
			},
			showPassword: {
				type: Boolean,
				default: false,
			},
			type: {
				type: String,
				default: 'text',
			},
			size: {
				type: String,
				default: 'default',
			},
		},
		emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear'],
		setup(props, { emit, attrs }) {
			const handleUpdateModelValue = (value: string) => {
				// 直接检查传入的值
				if (value && typeof value === 'string') {
					let cleanedValue = value;
					let detectedPatterns: string[] = [];

					// 检查每个危险模式
					SAFE_INPUT_PATTERNS.forEach(({ pattern, name }) => {
						if (pattern.test(value)) {
							detectedPatterns.push(name);
							// 移除检测到的危险字符
							cleanedValue = cleanedValue.replace(pattern, '');
						}
					});

					// 如果检测到危险字符
					if (detectedPatterns.length > 0) {
						// 更新为清理后的值
						emit('update:modelValue', cleanedValue);
						emit('input', cleanedValue); // 新增，确保 input 事件被触发

						// 显示具体检测到的危险字符
						const patternNames = detectedPatterns.join('、');
						ElMessage.warning(`检测到危险字符: ${patternNames}，已自动清除`);
						return;
					}
				}

				emit('update:modelValue', value);
				emit('input', value); // 新增，确保 input 事件被触发
			};

			return () => {
				return h(originalInput, {
					...attrs,
					...props,
					'onUpdate:modelValue': handleUpdateModelValue,
					onInput: attrs.onInput, // 新增，透传 onInput 事件
				});
			};
		},
	});

	app.component('ElInput', InterceptedInput);
}
