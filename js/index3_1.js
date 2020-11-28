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
  // 追加タスクをタスクオブジェクト格納配列に追加
  tasks.push(newtask);
  // タスク表示
  displayTask(tasks);
}

/**
* タスク状態変更機能
*  index 行数
*/
function changeStatus(index) {
  const oldStatus = tasks[index].status;
  // taskオブジェクトの状態を変更
  if (oldStatus === '作業中') {
    tasks[index].status = '完了';
  } else {
    tasks[index].status = '作業中';
  }
  // ボタン表示切替
  const targetBtn = document.getElementById(`workBtn_${index}`);
  targetBtn.innerText = tasks[index].status;
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
  // タスク表示
  displayTask(tasks);
}

/**
*タスク表示
* tasks 
*/
function displayTask(tasks) {
  // 追加済みタスク行が表示されている場合、削除
  const taskLength = taskTable.rows.length;
  if (taskLength > 1 ) {
    const rowCount = taskTable.rows.length - 1;
    // 見出し行を除く既存行を削除
    for (let i = rowCount; i > 0; i--) {
      taskTable.deleteRow(i);
    }
  }

  // タスク行生成
  tasks.forEach((obj, index) => {
    // 行追加
    const taskRow = taskTable.insertRow(-1);
    // タスクid セット
    const textId = document.createTextNode(obj.id);
    let cell = taskRow.insertCell(-1);
    cell.appendChild(textId);
    // コメント セット
    const textComment = document.createTextNode(obj.comment);
    cell = taskRow.insertCell(-1);
    cell.appendChild(textComment);
    // 作業中ボタンセット
    cell = taskRow.insertCell(-1);
    const workBtn = document.createElement('button')
    workBtn.type = 'button';
    workBtn.id = `workBtn_${index}`;
    workBtn.innerText = obj.status;
    workBtn.addEventListener('click', () => {
      changeStatus(index);
    });
    cell.appendChild(workBtn);
    // 削除ボタンセット
    cell = taskRow.insertCell(-1);
    const deleteBtn = document.createElement('button')
    deleteBtn.type = 'button';
    deleteBtn.id = `deleteBtn_${index}`;
    deleteBtn.innerText = '削除';
    deleteBtn.addEventListener('click', () => {
      deleteTask(index);
    });
    cell.appendChild(deleteBtn);
  });
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
