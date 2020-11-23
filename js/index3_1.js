'use strict';

// タスクオブジェクト格納配列
const tasks = [];
document.getElementById('addBtn').addEventListener('click', addTask);

/**
* タスク追加関数
*/
function addTask() {
  const inputTask = document.getElementById('addForm').value;
  if (!inputTask.trim()) {
    // 追加タスクが入力されていない場合
    return;
  }

  // タスクテーブル要素を取得
  const taskTable = document.getElementById('task_table_id');
  // 入力値をタスクオブジェクトに追加
  const newtask = {
    id: !tasks.length ? 0 : taskTable.rows.length - 1,
    comment: inputTask,
    status: '作業中'
  }

  // 追加タスク表示関数呼び出し
  displayTask(taskTable, newtask);
  // 追加タスクをタスクオブジェクト格納配列に追加
  tasks.push(newtask);
}

/**
*追加タスク表示
* taskTable タスク一覧テーブル
* tasks タスクオブジェクト格納配列
*/
function displayTask(taskTable, newtask) {
  // 行追加
  const newRow = taskTable.insertRow(-1);
  // タスクid セット
  const newTextId = document.createTextNode(newtask.id);
  let newCell = newRow.insertCell(-1);
  newCell.appendChild(newTextId);
  // コメント セット
  const newTextComment = document.createTextNode(newtask.comment);
  newCell = newRow.insertCell(-1);
  newCell.appendChild(newTextComment);
  // 作業中ボタンセット
  const newStatus = newtask.status;
  newCell = newRow.insertCell(-1);
  let workBtn = document.createElement('button')
  workBtn.type = 'button';
  workBtn.id = 'work_btnId';
  workBtn.innerText = newtask.status;
  newCell.appendChild(workBtn);
  // 削除ボタンセット
  newCell = newRow.insertCell(-1);
  const deleteBtn = document.createElement('button')
  deleteBtn.type = 'button';
  deleteBtn.id = 'delete_btnId';
  deleteBtn.innerText = '削除';
  newCell.appendChild(deleteBtn);
}