import Vue from "vue";
import Vuex from "vuex";

//应用Vuex插件
Vue.use(Vuex);

//存储数据
const state = {
	todoList: []
};

//响应组件中的动作
const actions = {
	//初始化，从本地存储读取数据
	init(context) {
		context.commit("init");
	},
	//将todo项添加进todo列表
	addTodoItem(context, todoItemObj) {
		context.commit("addTodoItem", todoItemObj);
	},
	//选中/不选中checkbox组件
	checkById(context, id) {
		//本地存储
		context.commit("checkById", id);
	},
	//删除对应组件
	deleteById(context, id) {
		if (confirm("是否删除？")) {
			context.commit("deleteById", id);
		}
	},
	//编辑对应组件
	editById(context, args) {
		context.commit("editById", args);
	},
	//清除已完成任务
	clearDone(context) {
		if (confirm("是否清除已完成？")) {
			context.commit("clearDone");
		}
	},
	//全选/全不选
	checkAll(context, event) {
		context.commit("checkAll", event.target.checked);
	}
};

//操作数据（state）
const mutations = {
	//初始化，从本地存储读取数据
	init(state) {
		state.todoList = JSON.parse(localStorage.getItem("todoList")) || [];
	},
	//将todo项添加进todo列表
	addTodoItem(state, todoItemObj) {
		//todo项添加进todo列表
		state.todoList.unshift(todoItemObj);
		//本地存储
		localStorage.setItem("todoList", JSON.stringify(state.todoList));
	},
	//选中/不选中checkbox组件
	checkById(state, id) {
		//取反
		state.todoList.forEach((todoItem) => {
			if (todoItem.id == id) {
				todoItem.done = !todoItem.done;
			}
		})
		//本地存储
		localStorage.setItem("todoList", JSON.stringify(state.todoList));
	},
	//删除对应组件
	deleteById(state, id) {
		//删除
		state.todoList.forEach((todoItem, index) => {
			if (todoItem.id == id) {
				state.todoList.splice(index, 1);
			}
		})
		//本地存储
		localStorage.setItem("todoList", JSON.stringify(state.todoList));
	},
	//编辑对应组件
	editById(state, args) {
		let id = args["id"];
		let value = args["value"];

		//修改
		state.todoList.forEach((todoItem) => {
			if (todoItem.id == id) {
				todoItem.title = value;
			}
		})

		//本地存储
		localStorage.setItem("todoList", JSON.stringify(state.todoList));
	},
	//清除已完成任务
	clearDone(state) {
		//清除已完成
		state.todoList = state.todoList.filter((todoItem) => {
			return !todoItem.done;
		})
		//本地存储
		localStorage.setItem("todoList", JSON.stringify(state.todoList));
	},
	//全选/全不选
	checkAll(state, checked) {
		//全选/全不选
		state.todoList.forEach((todoItem) => {
			todoItem.done = checked;
		})

		//本地存储
		localStorage.setItem("todoList", JSON.stringify(state.todoList));
	}
}

//将对数据（state）进行加工
const getters = {
	//全部任务数量
	todoItemTotal(state) {
		return state.todoList.length;
	},
	//已完成任务数量
	todoItemDoneTotal(state) {
		return state.todoList.reduce((pre, current) => {
			return pre + (current.done ? 1 : 0);
		}, 0);
	},
	//是否全部选中
	isAll(state, getters) {
		return getters.todoItemTotal === getters.todoItemDoneTotal && getters.todoItemTotal > 0;
	}
};

//创建并暴露store
export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
});
