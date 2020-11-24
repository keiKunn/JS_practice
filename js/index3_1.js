'use strict';

// タスクオブジェクト格納配列
const tasks = [];
// タスクテーブル要素を取得
const taskTable = document.getElementById('task_table_id');
// 追加ボタン押下イベント
document.getElementById('addBtn').addEventListener('click', addTask);
// 削除ボタン押下イベント
document.addEventListener('click',function(event){
  const t = event.target;
  if(t.id.match(/^deleteBtn$/)){
    deleteTask(event);
  }
});

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
  displayTask(newtask);
  // 追加タスクをタスクオブジェクト格納配列に追加
  tasks.push(newtask);
}

/**
* タスク削除機能
*/
function deleteTask(event) {
  // 削除対象行を取得
  const deleteTR = event.target.parentNode.parentNode;
  // tasksオブジェクトから削除
  tasks.splice(deleteTR.sectionRowIndex - 1, 1);
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
  tasks.forEach(obj => {
    displayTask(obj);
  });
}

/**
*タスク表示
* tasksObj タスクオブジェクト
*/
function displayTask(tasksObj) {
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
      workBtn.id = 'deleteBtn';
      workBtn.innerText = tasksObj.status;
      cell.appendChild(workBtn);
      // 削除ボタンセット
      cell = taskRow.insertCell(-1);
      const deleteBtn = document.createElement('button')
      deleteBtn.type = 'button';
      deleteBtn.id = 'deleteBtn';
      deleteBtn.innerText = '削除';
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
