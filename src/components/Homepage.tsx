import PinDropIcon from '@mui/icons-material/PinDrop';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

// import PageFooter from '@/components/shared/PageFooter';
// import ReactHookForm from '@/components/shared/ReactHookForm';

// import { SITE_CONFIG } from '@/constants';

export default function Homepage({
  reactVersion = 'unknown',
  nextJsVersion = 'unknown',
}) {
  return (
    <main>
      <section>
        <Box sx={{ textAlign: 'center' }}>
          <PinDropIcon
            className='page-title'
            sx={{ width: '3rem', height: '3rem' }}
          />
          {/* <Typography
            variant='h5'
            component='h1'
            gutterBottom
            className='page-title'
          >
            {SITE_CONFIG.title}
          </Typography>
          <Typography
            variant='subtitle2'
            gutterBottom
            className='page-subtitle'
          >
            {SITE_CONFIG.description}
          </Typography> */}

          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{ color: 'green', mt: 3 }}
          >
            넥스트 샘플 페이지 
            <Box sx={{ color: 'grey', fontSize: 10 }}>
              프리즈마 / 버셀 설정 완료
            </Box>
          </Typography>

          
          <Box sx={{ m: 5 }}>
            <Link
              href='https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2FAlexStack%2Fnextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter&showOptionalTeamCreation=false'
              target='_blank'
            >
              로그인
            </Link>
          </Box>
          
        </Box>
      </section>
      {/* <PageFooter /> */}
    </main>
  );
}