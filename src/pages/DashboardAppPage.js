import React, { useEffect, useState } from 'react';

import { Card, Collapse, Spin } from 'antd';

import { Container, Grid, Typography } from '@mui/material';

import { getDashTimeTable } from '../utils/apis';

const { Meta } = Card;

const MyMenuPage = () => {
  const date = new Date();
  let today = date.getDay();
  if (today === 0) {
    today = 7;
  }

  const [timeTableData, setTimeTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mondayData, setMondayData] = useState([]);
  const [tuesdayData, setTuesdayData] = useState([]);
  const [wednesdayData, setWednesdayData] = useState([]);
  const [thursdayData, setThursdayData] = useState([]);
  const [fridayData, setFridayData] = useState([]);
  const [saturdayData, setSaturdayData] = useState([]);
  const [sundayData, setSundayData] = useState([]);

  const [ser, setSer] = useState('');

  function getMealTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    // const minutes = currentTime.getMinutes();

    if (hours >= 1 && hours < 10) {
      setSer('Breakfast');
    } else if (hours >= 12 && hours < 15) {
      setSer('Lunch');
    } else if (hours >= 16 && hours < 18) {
      setSer('Snacks');
    } else if (hours >= 19 && hours < 21) {
      setSer('Dinner');
    } else {
      setSer('');
    }
  }

  useEffect(() => {
    getMealTime();
    const interval = setInterval(() => {
      getMealTime();
    }, 6000);

    return () => clearInterval(interval);
  }, []);
  
  const [allData, setAllData] = useState([])
  
  const getTimeTableData = async () => {
    
    setLoading(true);
    const res = await getDashTimeTable();

    if (res?.length) {
      setAllData(res)
    }

    setTimeTableData(res);
    setLoading(false);
  };
  useEffect(() => {
    try {
      getTimeTableData();
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const getCurrentDayMenu = () => {
    const currentDayIndex = new Date().getDay();
    const currentDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      currentDayIndex
    ];
    const reqData = []
    allData.forEach((item)=>{
      if(item.Day === currentDayName){
        reqData.push(item)
      }
    })

    const reqData2 = {}
    reqData.forEach((item)=>{
      if(item.Type === "Breakfast"){
        reqData2.Breakfast = item;
      }else if(item.Type === "Lunch"){
        reqData2.Lunch = item
      }else if(item.Type === "Snacks"){
        reqData2.Snacks = item
      }else if(item.Type === "Dinner"){
        reqData2.Dinner = item
      }
    })
    return reqData2
  };

  const currentDayMenu = getCurrentDayMenu();
  console.log(currentDayMenu)

  const items = [
    {
      key: '1',
      label: 'Breakfast',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu
            ?.Breakfast?.Items?.map((item, index) => (
              <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                <Card
                  bordered
                  style={{
                    width: 240,
                  }}
                  cover={
                    <img
                      style={{ height: '160px', objectFit: 'contain' }}
                      alt="example"
                      src={item.Image}
                      loading="lazy"
                    />
                  }
                >
                  <Meta title={item.Name} />
                </Card>
              </Grid>
            ))}
        </Grid>
      ),
    },
    
    {
      key: '2',
      label: 'Lunch',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu
            ?.Lunch?.Items?.map((item, index) => (
              <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                <Card
                  bordered
                  style={{
                    width: 240,
                  }}
                  cover={
                    <img
                      style={{ height: '160px', objectFit: 'contain' }}
                      alt="example"
                      src={item.Image}
                      loading="lazy"
                    />
                  }
                >
                  <Meta title={item.Name} />
                </Card>
              </Grid>
            ))}
        </Grid>
      ),
    },
    {
      key: '3',
      label: 'Snacks',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu
            ?.Snacks?.Items?.map((item, index) => (
              <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                <Card
                  bordered
                  style={{
                    width: 240,
                  }}
                  cover={
                    <img
                      style={{ height: '160px', objectFit: 'contain' }}
                      alt="example"
                      src={item.Image}
                      loading="lazy"
                    />
                  }
                >
                  <Meta title={item.Name} />
                </Card>
              </Grid>
            ))}
        </Grid>
      ),
    },
    {
      key: '4',
      label: 'Dinner',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu
            ?.Dinner?.Items?.map((item, index) => (
              <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                <Card
                  bordered
                  style={{
                    width: 240,
                  }}
                  cover={
                    <img
                      style={{ height: '160px', objectFit: 'contain' }}
                      alt="example"
                      src={item.Image}
                      loading="lazy"
                    />
                  }
                >
                  <Meta title={item.Name} />
                </Card>
              </Grid>
            ))}
        </Grid>
      ),
    },
  ];
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Today's Menu
        </Typography>
      <Spin spinning={loading} size="medium">
        <Collapse defaultActiveKey={['1','2','3','4']} size="large" items={items} />
      </Spin>
      </Container>
    </>
  );
};
export default MyMenuPage;
