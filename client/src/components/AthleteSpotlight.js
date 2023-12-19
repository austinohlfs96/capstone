import React, { useState, useEffect } from 'react';
import { Item, Image, Segment, Embed } from 'semantic-ui-react';
import Head from './Header';

const AthleteSpotlight = () => {


 

   


  return (
    <>
      <Head />
      <div className='modal'>
      <div id="services">
      <Segment style={{ background: 'rgba(255, 255, 255, 0.8)', width: '80%', maxWidth: '800px', height: '77vh', overflow: 'auto' }}>
        <h1>Athlete Spotlight</h1>
        <Segment style={{ background: 'rgba(255, 255, 255, 0.8)', width: 'fit-content' }}>
        <Image src='https://www.japantimes.co.jp/uploads/imported_images/uploads/2022/02/np_file_140504.jpeg' size='medium' floated='left' />
        <h1>Ayuma Hirano</h1>
        <h4>Ayumu Hirano lands a triple cork 1440, wins snowboard halfpipe at Toyota U.S. Grand Prix at Copper Mountain on last run</h4>
        <div style={{ width: '100%' }}> {/* Set the width to 100% */}
        <Embed
          style={{ width: '100%' }}
          id='bpvK62FzpT4'
          placeholder='https://swiftmedia.s3.amazonaws.com/mountain.swiftcom.com/images/sites/7/2023/12/16181224/unnamed-3-1024x680.jpg'
          source='youtube'
        />
      </div>
        <h4>Ayumu Hirano knows how to come through in the clutch.

      After failing to put together a top-to-bottom run on his first two tries, the defending snowboard halfpipe Olympic gold medalist dazzled the crowd at Copper Mountain with a 91.00 on his final run to claim the Toyota Grand Prix title on Saturday. His Japanese teammate, Yuto Totsuka (78.00) took bronze while Korean Chaeun Lee (80.00) won the silver in a competition which came down the wire.</h4>
        </Segment>
        <Segment style={{ background: 'rgba(255, 255, 255, 0.8)', width: 'fit-content' }}>
        <Image src='https://usskiandsnowboard.org/sites/default/files/images/news-articles/hero-image/2023-12/IMG_2921.jpeg' size='medium' floated='left' />
        <h1>Mac Forehand</h1>
        <h4>Mac Forehand finishes 2023 winning gold at the Visa Big Air at Copper Mountain, Colorado</h4>
        <div style={{ width: '100%' }}> {/* Set the width to 100% */}
        <Embed
          style={{ width: '100%' }}
          id='aBTSP7apRpw'
          placeholder='https://s.hdnux.com/photos/01/23/63/32/21968564/4/rawImage.jpg'
          source='youtube'
        />
      </div>
        <h4>
        American Mac Forehand began 2023 with his first major senior ski big air title and ended it with another at the Visa Big Air at Copper Mountain, Colorado, on Saturday. Forehand, who was 11th in his Olympic debut last year, scored 93 and 94 points on his last two runs — two different triple cork 1800s — to win by two points over Italian Miro Tabanelli. Olympic gold medalist Birk Ruud of Norway took third.</h4>
        </Segment>
        <Segment style={{ background: 'rgba(255, 255, 255, 0.8)', width: 'fit-content' }}>
        <Image src='https://ww1.prweb.com/prfiles/2022/01/31/18470437/Sage_Kotsenburg_Wins_Natural_Selction_Jackson.42207E3F-46A5-4FF0-B9AC-6147A9A63189-54019-00000800A29.jpg' size='medium' floated='left' />
        <h1>Sage Kostsenburg</h1>
        <h4>Sage Kostsenburg's winning run from the Jackson Hole stop on the NAtural Seletion Toour</h4>
        <div style={{ width: '100%' }}> {/* Set the width to 100% */}
        <Embed
          style={{ width: '100%' }}
          id='v2p0YRFUhU0'
          placeholder='https://www.theinertia.com/wp-content/uploads/2022/01/sage.jpg'
          source='youtube'
        />
      </div>
        <h4>
        Congratulations to Sage Kotsenburg who was awarded Run of the Day honors at the first stop of the Natural Selection Tour in Jackson Hole. Sage was paired with K2 teammate Gabe Ferguson and it was a nail biter of a head to head battle that required a tie breaking bonus run. Variable snow conditions made for sketchy chundery ride outs and truth be told, there were probably more falls than clean landing throughout the day but that’s the reality of staging a big mountain freestyle competition. You work with what mother nature gives you and you make the most of it. Sage made the most of it. Next stop Baldface Lodge in March!</h4>
        </Segment>
        <Segment style={{ background: 'rgba(255, 255, 255, 0.8)', width: 'fit-content' }}>
        <Image src='https://ww1.prweb.com/prfiles/2020/02/29/16948563/DustyHenricksen-USOpen-2020-Vail-Monster-Mathis-lowres-6045.jpg' size='medium' floated='left' />
        <h1>Dusty Hendrickson</h1>
        <h4>Dusty Henricksen went full pull on his last run to take second place at the Burton U·S·Open Men's Snowboarding Slopestyle Finals - and he did his final run and first quad work in a t-shirt.</h4>
        <div style={{ width: '100%' }}> {/* Set the width to 100% */}
        <Embed
          style={{ width: '100%' }}
          id='FpMGwHIh1Yc'
          placeholder='https://swiftmedia.s3.amazonaws.com/mountain.swiftcom.com/images/sites/5/2020/02/10060906/BurtonSlopeMensFinals-VDN-022920-2-1024x774.jpg'
          source='youtube'
        />
      </div>
        <h4>
        T-shirt clad Dusty Henricksen melted everyone’s brain this weekend by putting down one hell of a rotation at the Burton U.S. Open. Even though it was the first time he’s ever attempted a quad cork in competition, Henricksen stomped it effortlessly. Surprisingly, it wasn’t enough to snag first place. Yuki Kadono edged him out with a clean and stylish run, making for an overall exciting day of slopestyle action.</h4>
        </Segment>
        <Segment style={{ background: 'rgba(255, 255, 255, 0.8)', width: 'fit-content' }}>
        <Image src='https://pbs.twimg.com/media/Fp2GGmaakAEnJHk.jpg:large' size='medium' floated='left' />
        <h1>Patti Khou</h1>
        <h4>As the youngest-ever Winter DewTour competitor, China's Zhou Yizhu (Patti Zhou) took silver in the Women's Snowboard Superpipe at Copper Mountain, Colorado. The 11-year-old threw down a 90.66 run in her second attempt at the pipe.</h4>
        <div style={{ width: '100%' }}> {/* Set the width to 100% */}
        <Embed
          style={{ width: '100%' }}
          id='CeArxrZneGw'
          placeholder='https://imageio.forbes.com/specials-images/imageserve/641b534511944ecdc9422d10/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds'
          source='youtube'
        />
      </div>
        <h4>
        The 11-year-old snowboarder finished second in the Dew Tour women’s snowboard superpipe event Sunday in Copper Mountain, Colorado, becoming the youngest athlete to ever land on a winter Dew Tour podium and the second-youngest ever at any Dew Tour event. Zhou trailed 14-year-old South Korean Gaon Choi, whose score of 98.33 was one of the highest ever awarded at the Dew Tour.</h4>
        </Segment>
        </Segment>
        
      </div>
    </div>
    </>
  );
};

export default AthleteSpotlight;
