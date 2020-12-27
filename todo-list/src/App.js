import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.addTask = this.addTask.bind(this); // ？：this.addTaskと宣言する理由 > render内のonClickで{this.addTask}と、したいため。また、そうすることでコンポーネント内のstateも利用できる。
  }

  /**
  * タスク追加機能
  */
  addTask() {
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
                        <td><button type='button'>削除</button></td>
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
