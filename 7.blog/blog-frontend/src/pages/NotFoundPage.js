import React from 'react';
import NotFound from 'components/common/NotFound';

const NotFoundPage = ({history, staticContext}) => {
  // staticContext는 서버 쪽에서만 존재한다.
  if(staticContext) {
    staticContext.isNotFound = true;
  }
  return (
    <div>
      <NotFound onGoBack={history.goBack} />
    </div>
  );
};

export default NotFoundPage;
