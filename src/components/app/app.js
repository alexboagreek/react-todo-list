import React, { Component } from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import  './app.css';

export default class App extends Component {
    maxId = 100;
    state = {
        todoData : [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Eat meat and protein'),
        ]
    };
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }
    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const ind = todoData.findIndex((el) => el.id === id);
           // todoData.splice(ind, 1);
           // const before = todoData.slice(0, ind);
           // const after = todoData.slice(ind + 1);
            const newArray = [...todoData.slice(0, ind), ...todoData.slice(ind + 1)];
           return {
               todoData: newArray
           };
        });
    };
    addItem = (text) => {
        // generate id
        const newItem = this.createTodoItem(text);
        // add element in array
        this.setState(({ todoData }) => {
             const newArr = [
                 ...todoData,
                 newItem
             ];
             return {
                 todoData: newArr
             };
        });

    };
    toggleProperty(arr, id, propName) {
        const ind = arr.findIndex((el) => el.id === id);

        // 1. update object
        const oldItem = arr[ind];
        const newItem = {...oldItem, [propName]: !oldItem[propName] };
        //2. construct new Array
        return  [
            ...arr.slice(0, ind),
            newItem,
            ...arr.slice(ind + 1)
        ];

    }
    onToggleDone = (id) => {
        this.setState(( { todoData } ) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };

        });
    };
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };


    render() {
        const { todoData } = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                {/*{ isLoggedIn ? welcomeBox : loginBox }*/}
                <AppHeader toDo={ todoCount } done={ doneCount } />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter/>
                </div>
                <TodoList
                    todos = { todoData }
                    onDeleted = { this.deleteItem }
                    onToggleImportant = { this.onToggleImportant }
                    onToggleDone = { this.onToggleDone }
                />
                <ItemAddForm onItemAdded = { this.addItem } />
            </div>
        );
    }

};

