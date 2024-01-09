import { Segment, Image } from 'semantic-ui-react'
import Head from "./Header";

const src = '/images/wireframe/image-text.png'

const Title = () => {
  return (
    <div >
      <Head/>
      <div className='modal'>
      <Segment style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
      <h1>About Page</h1>
    <Image src='https://www.usskiandsnowboard.org/sites/default/files/paragraph/single-image-caption/2020-01/maggiepodium%20.jpg' size='medium' floated='left' />
    <h4>
    Welcome to Æsir Performance Tunes, your premier destination for professional performance ski and snowboard tuning. At Æsir Performance Tunes, we take pride in our commitment to excellence and our passion for elevating winter sports performance. With a dedicated team of skilled technicians and state-of-the-art machinery, we offer top-tier tuning services tailored for athletes and coaches seeking to outperform the competition.
    </h4>
    <Image src='https://www.snowboarder.com/.image/t_share/MTk2MzUwOTc2MjcyNDQzMzMx/tuning-taylor-boyd-02.jpg' size='medium' floated='right' />
    
    <h4>
    Our commitment to quality begins with the utilization of cutting-edge equipment and high-end products that set us apart in the industry. We understand the demands of competitive skiing and snowboarding, and our tuning processes are designed to enhance the precision and performance of your gear. Whether you're a seasoned athlete or a coach guiding a team towards victory, our meticulous approach ensures that your equipment is finely tuned to meet the rigorous demands of high-level competition.


    </h4>
    <h4>
    At Æsir Performance Tunes, we prioritize the individual needs of each client, providing customized tuning solutions to optimize performance on the slopes. Our experienced technicians combine technical expertise with a genuine love for the sport, ensuring that every pair of skis or snowboard receives the attention it deserves. Join the ranks of elite athletes who trust Æsir Performance Tunes for their tuning needs, and experience the difference that precision and passion can make in pushing your performance to new heights.
    </h4>
    
  </Segment>
  <Image src='https://lh3.googleusercontent.com/pw/ABLVV86eykuClMvHBq9EjGRJlUr8kNFbB9oPGfive53cbB7o1jdkIUxB38RhrRTITjbPgMfoNv0nHQW2LbkRpurwbkbb-eYd4CBdSgvnaOjzcBB6bw_daCn78oFNzIH399zmN3IVt8hNVFk3on4H7gzfP3EWKxsnS2bcd0Q4zVZff0UtZUOVIg8nbcc56ngDHQCn-VmJE-fzTNwgkQnmxTxrVZTwR2obewZcAzJ57aaOgF98Uh7uRIFzrdGXh9X4Huzltwvu2J-h6AnqMrq-byioQ1RWYCI0HkugABUwgXWZICKXvutJCqMeMLswlpk7UHqyprDZG5y-_RpUG6chmfR_UQkhMUbs8pqF-cgoL2IqneeS0uLuCiUNqGxVJrEW5of0TRhbN-A8oIZK3F81P6G4QLtEEMPt0RL6BNOziEUzCbyBYOv-0-Lj315RccQMWnVWxZXnMDCCl_mx22NFXs8LwvcenLIgiqAFF6qngJZR8HJlxFWJ8R6QMkfQYQg86N-dwXsY23W3vQ08EXVMwTR5KRrVIwFYO_86P69zvoiexVJauQarK8UJZdfE_Kys0hsznUeK4IfvoN-YIoMv-ASDTIeTuaDB2askfGEzzux1MVNLcDlis9WhU5HIuNaiLzzEkUmtjteMKADLYplMAHNn8Yxh6qp_6FYH3l5FcvU0sm7ehFS1chFKwNSgbldG_aI8kp4fWTw_uzHG5XvV31VoMMPeU5ZLYJTpPicaREtevCM3mjVBXwFUH_TRTEKAJ_S30EblosNg6FBTQzlLbWmBOyi82HDfAn2KMN8EEIIW7Tmmsm3k_ktR5iLviObo0Vrg92Z-G-DqBAevMpyj0hI2B52RGgafX1PtGPw6uTv204uu8ni-LNABibtuRDxTUSrQDP2htls=w768-h1024-s-no-gm?authuser=0' size='large' centered />
  </div>
    </div>
  )
}

export default Title;