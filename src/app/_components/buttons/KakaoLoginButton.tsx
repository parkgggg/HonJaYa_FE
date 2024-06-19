import Link from 'next/link';
import Image from 'next/image';

const KakaoLoginButton = () => {
  return (
      <Link
        href="https://k2b3bc621690aa.user-app.krampoline.com/api/oauth2/authorization/kakao"
      >
        <div className="mr-5">
          <Image
            src="/kakao_login_medium_narrow.png"
            alt="카카오 로그인"
            width={160}
            height={40}
            className="object-contain"
          />
        </div>
      </Link>
  );
};

export default KakaoLoginButton;