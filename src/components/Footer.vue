<template>
	<div class="todo-footer" v-show="total">
		<label>
			<input type="checkbox" v-model="isAll" />
		</label>
		<span>
			<span>已完成 {{doneTotal}}</span> / 全部 {{total}}
		</span>
		<button class="btn btn-danger" @click="handlerClear">清除已完成任务</button>
	</div>
</template>

<script>
	export default {
		name: "Footer",
		//接收App.vue传递的数据
		props: ["todos"],
		computed: {
			//统计全部
			total() {
				return this.todos.length
			},
			//统计已完成
			doneTotal() {
				return this.todos.reduce((pre, current) => {
					return pre + (current.done ? 1 : 0)
				}, 0)
			},
			//判断初始是否勾选
			isAll: {
				get() {
					return this.total === this.doneTotal && this.total > 0
				},
				set(value) {
					//自定义组件
					this.$emit("checkAll", value)
				}
			}
		},
		methods: {
			//自定义组件，清除已完成
			handlerClear() {
				if (confirm("是否全部删除？"))
					this.$emit("deleteAll")
			}
		}
	}
</script>

<style scoped>
	/*footer*/
	.todo-footer {
		height: 40px;
		line-height: 40px;
		padding-left: 6px;
		margin-top: 5px;
	}

	.todo-footer label {
		display: inline-block;
		margin-right: 20px;
		cursor: pointer;
	}

	.todo-footer label input {
		position: relative;
		top: -1px;
		vertical-align: middle;
		margin-right: 5px;
	}

	.todo-footer button {
		float: right;
		margin-top: 5px;
	}
</style>
