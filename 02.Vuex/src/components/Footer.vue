<template>
	<div class="todo-footer" v-show="todoItemTotal">
		<label>
			<input type="checkbox" :checked="isAll" @change="handleCheck($event)" />
		</label>
		<span>
			<span>已完成 {{todoItemDoneTotal}}</span> / 全部 {{todoItemTotal}}
		</span>
		<button class="btn btn-danger" @click="handleClear()">清除已完成任务</button>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	export default {
		name: "Footer",
		computed: {
			//借助mapGetters生成计算属性
			...mapGetters(["todoItemTotal","todoItemDoneTotal","isAll"])
		},
		methods: {
			//借助mapActions生成对应的方法，会调用dispatch去联系actions
			...mapActions({handleClear:"clearDone",handleCheck:"checkAll"})
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
