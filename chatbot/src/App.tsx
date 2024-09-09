import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Chat from './Components/ChatContainer/Chat';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <Chat />
            </div>
        </Provider>
    );
};

export default App;



