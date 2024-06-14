import { useGoogleLoginQuery } from '@/hooks/reactQuery/auth/useSocialLoginQuery';
import Loading from '@/components/common/Loading';

const GoogleRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const { isLoading } = useGoogleLoginQuery(code);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <h1 className="text-36 font-bold underline">Google Redirect Page</h1>
      )}
    </div>
  );
};

export default GoogleRedirect;
