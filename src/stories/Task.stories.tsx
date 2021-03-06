import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import Task, {TaskPropsType} from '../Task';



export default {
    title: 'TodoList/Task',
    component: Task,
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task') ;
const changeTaskTitleCallback = action('Title changed inside Task') ;
const removeTaskCallback = action('Remove Button inside Task clicked') ;


const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    taskId: '1',
    taskIsDone: true,
    taskTitle: 'JS',
    todoListId: 'todoListId1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    taskId: '1',
    taskIsDone: false,
    taskTitle: 'JS',
    todoListId: 'todoListId1'
};

