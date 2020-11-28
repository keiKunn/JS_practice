'use strict';

// タスクオブジェクト格納配列
const tasks = [];
// タスクテーブル要素を取得
const taskTable = document.getElementById('task_table_id');
// 追加ボタン押下イベント
document.getElementById('addBtn').addEventListener('click', addTask);
// ラジオボタン表示切替イベント
const radioElements = document.getElementsByName('todo_radio_name');
radioElements.forEach(element => {
  element.addEventListener('click', changeDisplay);
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
    id: !tasks.length ? 0 : tasks.length,
    comment: inputTask,
    status: '作業中'
  }
  // 追加タスクをタスクオブジェクト格納配列に追加
  tasks.push(newtask);
  // タスク表示
  changeDisplay();
}

/**
* タスク状態変更機能
*  index 行数
*/
function changeStatus(id) {
  const oldStatus = tasks[id].status;
  // taskオブジェクトの状態を変更
  if (oldStatus === '作業中') {
    tasks[id].status = '完了';
  } else {
    tasks[id].status = '作業中';
  }
  // ボタン表示切替
  const targetBtn = document.getElementById(`workBtn_${id}`);
  targetBtn.innerText = tasks[id].status;
  // タスク表示
  changeDisplay();
}

/**
* タスク表示切替機能
*/
function changeDisplay() {
  // ラジオボタンDOM取得
  const allRadio = document.getElementById('all_radio_id');
  const workRadio = document.getElementById('work_radio_id');
  const doneRadio = document.getElementById('done_radio_id');

  // 表示切替
  if(allRadio.checked){
    displayTask(tasks);
  } else if (workRadio.checked) {
    const workTasks = tasks.filter(task => {
      return task.status === '作業中';
    })
    // 作業中タスクを表示
    displayTask(workTasks);
  } else if (doneRadio.checked) {
    const doneTasks = tasks.filter(task => {
      return task.status === '完了';
    })
    // 作業中タスクを表示
    displayTask(doneTasks);
  }
}

/**
* タスク削除機能
*  id 
*/
function deleteTask(id) {
  // tasksオブジェクトから削除
  tasks.splice(id, 1);
  // tasksオブジェクトのid値を振り直し
  reAssignTaskId();
  // タスク表示
  changeDisplay();
}

/**
*タスク表示
* arrayTasks タスクオブジェクト格納配列
*/
function displayTask(arrayTasks) {
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
  arrayTasks.forEach(obj => {
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
    workBtn.id = `workBtn_${obj.id}`;
    workBtn.innerText = obj.status;
    workBtn.addEventListener('click', () => {
      changeStatus(obj.id);
    });
    cell.appendChild(workBtn);
    // 削除ボタンセット
    cell = taskRow.insertCell(-1);
    const deleteBtn = document.createElement('button')
    deleteBtn.type = 'button';
    deleteBtn.id = `deleteBtn_${obj.id}`;
    deleteBtn.innerText = '削除';
    deleteBtn.addEventListener('click', () => {
      deleteTask(obj.id);
    });
    cell.appendChild(deleteBtn);
  });
}

/**
*タスクid 振り直し
*/
function reAssignTaskId() {
  let cnt = 0;
  tasks.forEach(obj => {
    obj.id = cnt;
    cnt++;
  });
}
