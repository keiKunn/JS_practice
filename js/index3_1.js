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
    return false;
  }

  // タスクテーブル要素を取得
  const taskTable = document.getElementById('task_table_id');
  // 入力値をタスクオブジェクトに追加
  const newtask = {
    id: !tasks.length ? 0 : taskTable.rows.length - 1,
    comment: inputTask,
    status: !tasks.length ? addTaskBtn(0) : addTaskBtn(taskTable.rows.length)
  }

  // 追加タスク表示関数呼び出し
  displayTask(taskTable, newtask);
  // 追加タスクをタスクオブジェクト格納配列に追加
  tasks.push(newtask);
}

/**
*タスク操作ボタン生成
* row 行数
*/
function addTaskBtn(row) {
  // 作業中ボタン追加
  const workBtn = document.createElement('input')
  workBtn.id = `work_btnId_${row}`;
  workBtn.value = '作業中';
  // 削除ボタン追加
  const deleteBtn = document.createElement('input')
  deleteBtn.id = `delete_btnId_${row}`;
  deleteBtn.value = '削除';

  return workBtn + deleteBtn;
}

/**
*追加タスク表示
* taskTable タスク一覧テーブル
* tasks タスクオブジェクト格納配列
*/
function displayTask(taskTable, newtask) {
  // 行追加
  const newRow = taskTable.insertRow();
  let newCell = newRow.insertCell();
  // タスクid セット
  const newTextId = document.createTextNode(newtask.id);
  newCell.appendChild(newTextId);
  // コメント セット
  const newTextComment = document.createTextNode(newtask.comment);
  newCell = newRow.insertCell();
  newCell.appendChild(newTextComment);
  // 状態 セット
  const newStatus = newtask.status;
  newCell = newRow.insertCell();
  newCell.innerHTML = newStatus;    // [object HTMLInputElement][object HTMLInputElement]
  //newCell.appendChild(newStatus); //  Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.

}