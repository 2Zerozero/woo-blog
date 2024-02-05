import Header from '@/components/Header/header';
import './home.scss';

const Home = () => {
  return (
    <>
      {/* 헤더 */}
      <Header />

      <div className="container">
        {/* 왼쪽 네비게이션 */}
        <div className="leftSection">
          {/* 유저 */}
          <div className="user">
            <div>2Zerozero</div>
            <button>버튼</button>
          </div>
          {/* 블로그 카테고리 */}
          <div>
            <ul>
              <li>리스트 1</li>
              <li>리스트 2</li>
              <li>리스트 3</li>
            </ul>
          </div>
        </div>

        {/* 오른쪽 섹션 */}
        <div className="rightSection"></div>
      </div>
    </>
  );
};

export default Home;
