import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '~/trpc/react'; // 确保路径正确
import styles from './SetName.module.css'; // 确保样式路径正确

function SetName() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nickname, setNickname] = useState('');
  const { state } = location.state || {};

  // 使用 tRPC 的 useMutation 钩子来调用后端的 setName 路由
  const { mutate: setName} = api.setName.setName.useMutation({
    onSuccess: () => {
      console.log('Nickname set to:', nickname);
      navigate('/index', { replace: true });
    },
    onError: (error:any) => {
      console.error('Error setting nickname:', error);
    },
  });

  const handleSetNickname = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName({ name: nickname }); // 调用后端 API 来保存昵称
  };

  return (
    <div className="set-name-page">
      <h1>设置昵称</h1>
      <form onSubmit={handleSetNickname}>
        <input
          type="text"
          placeholder="输入您的昵称"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <button type="submit" >
          { "Submitting...设置昵称并进入"}
        </button>
      </form>
      {
        state && <p>状态信息: {JSON.stringify(state)}</p>
      }
    </div>
  );
}

export default SetName;