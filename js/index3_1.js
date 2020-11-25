'use strict';

// タスクオブジェクト格納配列
const tasks = [];
// タスクテーブル要素を取得
const taskTable = document.getElementById('task_table_id');
// 追加ボタン押下イベント
document.getElementById('addBtn').addEventListener('click', addTask);

/**
* タスク追加機能
*/
function addTask() {
  const inputTask = document.getElementById('addForm').value;
  if (!inputTask.trim()) {
    // 追加タスクが入力されていない場合
    return;
  }
  // 入力値をタスクオブジェクトに追加
  const newtask = {
    id: !tasks.length ? 0 : taskTable.rows.length - 1,
    comment: inputTask,
    status: '作業中'
  }
  // タスク表示
  displayTask(newtask, newtask.id);
  // 追加タスクをタスクオブジェクト格納配列に追加
  tasks.push(newtask);
}

/**
* タスク削除機能
*  index 行数
*/
function deleteTask(index) {
  // tasksオブジェクトから削除
  tasks.splice(index, 1);
  // tasksオブジェクトのid値を振り直し
  reAssignTaskId(tasks);
  // 削除後タスク表示呼出
  displayAfterDeleteTask(tasks);
}

/**
*削除後タスク表示
* tasks タスクオブジェクト格納配列
*/
function displayAfterDeleteTask(tasks) {
  const tableRows = taskTable.getElementsByTagName('tr');
  const rowCount = taskTable.rows.length - 1;

  // 見出し行を除く既存行を削除
  for (let i = rowCount; i > 0; i--) {
    taskTable.deleteRow(i);
  }
  // タスク表示
  tasks.forEach((obj, index) => {
    displayTask(obj, index);
  });
}

/**
*タスク表示
* tasksObj タスクオブジェクト
* index 行数
*/
function displayTask(tasksObj, index) {
  // 行追加
  const taskRow = taskTable.insertRow(-1);
  // タスクid セット
  const textId = document.createTextNode(tasksObj.id);
  let cell = taskRow.insertCell(-1);
  cell.appendChild(textId);
  // コメント セット
  const textComment = document.createTextNode(tasksObj.comment);
  cell = taskRow.insertCell(-1);
  cell.appendChild(textComment);
  // 作業中ボタンセット
  cell = taskRow.insertCell(-1);
  const workBtn = document.createElement('button')
  workBtn.type = 'button';
  workBtn.id = 'workBtn';
  workBtn.innerText = tasksObj.status;
  cell.appendChild(workBtn);
  // 削除ボタンセット
  cell = taskRow.insertCell(-1);
  const deleteBtn = document.createElement('button')
  deleteBtn.type = 'button';
  deleteBtn.id = 'deleteBtn';
  deleteBtn.innerText = '削除';
  deleteBtn.addEventListener('click', () => {
    deleteTask(index);
  });
  cell.appendChild(deleteBtn);
}

/**
*タスクid 振り直し
* tasks タスクオブジェクト格納配列
*/
function reAssignTaskId(tasks) {
  let cnt = 0;
  tasks.forEach(obj => {
    obj.id = cnt;
    cnt++;
  });
}
