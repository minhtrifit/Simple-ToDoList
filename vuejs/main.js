export default {
    data () {
        return {
            taskInput: '',
            Task: {
                isCheck: false,
                content: '',
                isDelete: false,
            },
            // taskList: [
            //     { isCheck: false, content: 'HTML/CSS/JS', isDelete: false, },
            //     { isCheck: false, content: 'PHP', isDelete: false, },
            // ],
            taskList: [],

        }
    },

    components: {

    },

    methods: {
        loadDatabase() { return JSON.parse(localStorage.getItem('content')); },

        addTaskHandle() {
            if(this.loadDatabase()) { this.taskList = this.loadDatabase(); }
            else { this.taskList = []; }

            this.Task.isCheck = false;
            this.Task.content = this.taskInput;
            this.Task.isDelete = false;
            
            this.taskList.push(this.Task);
            localStorage.setItem('content', JSON.stringify(this.taskList));
            this.taskInput = '';
        },

        handleCheck(task, taskIndex) {
            var curTaskList = this.loadDatabase();
            curTaskList[taskIndex].isCheck = !curTaskList[taskIndex].isCheck;  
            // this.isCheck = !this.isCheck;
            
            this.taskList = curTaskList;     
            localStorage.setItem('content', JSON.stringify(this.taskList));
        },

        handleRemove(task, taskIndex) {
            var curTaskList = this.loadDatabase();
            curTaskList.splice(taskIndex, 1);
            this.taskList = curTaskList;
            localStorage.setItem('content', JSON.stringify(this.taskList));
        }
    },

    mounted() { localStorage.removeItem('content'); },  

    template: `
    <div id="main">
        <div id="title">To do list</div>
        <div id="nav">
            <input type="text" placeholder="Task content" v-model="taskInput">
            <button @click="addTaskHandle">Add</button>
        </div>
        <div id="content" v-for="(task, index) in taskList">

            <div :id="index" class="task__container">
                <input type="checkbox" @click="handleCheck(task, index)" v-model="task.isCheck">
                <div :class="{checked: task.isCheck}">{{ task.content }}</div>
                <i class="fa fa-trash-o" @click="handleRemove(task, index)"></i>
            </div>

        </div>
    </div>  
    `
}