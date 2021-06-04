import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export default class CategoryCard extends Component {
  
  handleClick = (evt) => {
    // console.log(this.props.category.id)
    this.props.handleChooseCategory(this.props.category.id)
    
  }
  
  url = {
    1: 'https://www.rd.com/wp-content/uploads/2019/09/shutterstock_editorial_5884766b-e1569251332374.jpg',
    2: 'https://www.symboinsurance.com/wp-content/uploads/2017/08/Automobile-industry-article-1.png',
    10: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8pjmYwOhm7Mkmu-SFWMm5D9Su88kB3wnJow&usqp=CAU',
    15: 'https://cdn-japantimes.com/wp-content/uploads/2018/12/n-cats-a-20181226.jpg',
    17: 'https://www.telegraph.co.uk/multimedia/archive/02306/rudisha_2306835b.jpg',
    20: 'https://variety.com/wp-content/uploads/2020/01/activision-blizzard-overwatch-league-grand-finals-2018.jpg',
    22: 'https://neilpatel.com/wp-content/uploads/2018/10/blog.jpg',
    23: 'https://treetops.com/wp-content/uploads/2019/09/Comedy-Show-AdobeStock_194888694-800x420.jpg',
    24: 'https://media.cntraveler.com/photos/5cb78ee014cdcb3a1825b3c0/5:4/w_2085,h_1668,c_limit/disney_2019_writethrough.jpg',
    25: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJPcxYVyyF-0-Dr0_3zq7YjMmRAud4qh-twA&usqp=CAU',
    26: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsPMswltu9w-w7VyCJazMG1RG09zsrtsN0aw&usqp=CAU',
    27: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwkv9YU39X2PUT56aKibQy_JNbnFOLJGlLPA&usqp=CAU',
    28: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2FVD6C6s7_2xLDF8CYOz4taVS7WCjD6btQ&usqp=CAU'
  }

  render() {
    const {snippet,timesWatched} = this.props.category
    return (
      <Card onClick ={this.handleClick} color='black' size='medium'>
        <Image src={this.url[this.props.category.id]} size='big' />
        <Card.Content >
        <Card.Header >{snippet.title}</Card.Header>
        {this.props.sorted ? <Card.Meta>Chosen {timesWatched} times</Card.Meta> : ''}
        </Card.Content>
      </Card>
    )
  }
}
