export const GoogleAdsense: React.FC = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

  if (clientId) {
    return (
      <script
        async
        src={
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
          process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID
        }
        crossOrigin="anonymous"
      />
    );
  }

  return <></>;
};
