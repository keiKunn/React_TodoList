import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.deleteTask = this.deleteTask.bind(this);
  }

  /**
  * タスク追加機能
  * 学習メモ：renderでのthisを固定化(コンポーネントの関数を指定)するために、アロー関数で定義
  */
  addTask = () => {
    const tasks = this.state.tasks; // ★今のstate状態を取得
    const inputTask = document.getElementById('addForm').value;
    if (!inputTask) {
      return;
    }

    const newTask = {
      id: !tasks.length ? 0 : tasks.length,
      comment: inputTask,
      status: '作業中'
    }

    this.state.tasks.push(newTask);
    this.setState({ tasks });
  }

  /**
  * タスク削除機能
  * 学習メモ：render内でのアロー関数は、レンダリングする度に関数が定義されてしまうため非推奨。
  *          →関数を返却する関数を定義し、そこに引数-idを持たせる。
  */
  deleteTask = (id) => () => {
    const tasksCopy = this.state.tasks.slice();
    // 選択されたタスクをstateから削除 
    tasksCopy.splice(id, 1);
    // IDの振り直し
    tasksCopy.forEach((obj, idx) => {
      obj.id = idx;
    });
    this.setState({ tasks: tasksCopy });
  }

  render() {
    return (
      <div>
        <h1>ToDoリスト1</h1>
        <div id="radio-area-id">
          <input type="radio" id="all-radio-id" name="todo-radio-name" value="all-radio-value" checked />
          <label htmlFor="all_radio_id">すべて</label>
          <input type="radio" id="work-radio-id" name="todo-radio-name" value="work-radio-value" />
          <label htmlFor="work_radio_id">作業中</label>
          <input type="radio" id="done-radio-id" name="todo-radio-name" value="done-radio-value" />
          <label htmlFor="done-radio-id">完了</label>
        </div>
        <table id="task-table-id">
          <tbody>
            <tr>
              <th>ID</th>
              <th>コメント</th>
              <th>状態</th>
            </tr>
            {
              this.state.tasks.map(obj => {
                return <tr>
                        <td>{obj.id}</td>
                        <td>{obj.comment}</td>
                        <td><button type='button'>{obj.status}</button></td>
                        <td><button type='button' onClick={this.deleteTask(obj.id)}>削除</button></td>
                      </tr>
              })
            }
          </tbody>
        </table>
        <h2>新規タスクの追加</h2>
        <div id="form-area-id">
          <input type="text" id="addForm" />
          <input type="button" id="addBtn" value="追加" onClick={this.addTask} />{/*chrome 開発ツール html上ではonClickイベントが登録されていない？ */}
        </div>
      </div>
    );
  }
}

export default App;
