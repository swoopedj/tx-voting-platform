/*eslint-disable */
const entryResult = module.exports;
entryResult.data = {
  "items" : [
    {
      "id": "1",
      "snippet": {
        "title": "A",
        "description": "B",
        "thumbnails": {
          "high": {
            "url": "C",
            "width": 1,
            "height": 2
          }
        },
      },
      "statistics": {
        "viewCount": "3",
      },
      "player": {
        "embedHtml": "7"
      }    
    },
  ],

}

entryResult.result = { 
  thumbnailURL: 'C',
  title: 'A',
  embedID: '1',
  description: 'B',
  statistics: { viewCount: '3' } 
}
/*eslint-enable */
