export default {
  components: { },
  name: 'flex-page',
  data () {
    return {
      // ----- dialog控制参数 ------
      showContentSetDialog: false,
      showItemSetDialog: false,
      // ----- 源数据 -------
      chooseItemObj: {},
      contentStyleObj: {
        father: { flexDirection: null, flexWrap: null, justifyContent: null, alignItems: null, alignContent: null },
        children: [
          { order: null, flexGrow: null, flexShrink: null, flexBasis: null, flex: null, alignSelf: null }
        ]
      },
      styleSchema: {
        f: [
          { key: 'flexDirection', selectList: [ 'row', 'row-reverse', 'column', 'column-reverse' ], default: 'row' },
          { key: 'flexWrap', selectList: [ 'nowrap', 'wrap', 'wrap-reverse' ], default: 'nowrap' },
          { key: 'flexFlow', selectList: [], default: '', type: 'double', double: [ 'flexDirection', 'flexWrap' ] },
          { key: 'justifyContent', selectList: [ 'flex-start', 'flex-end', 'center', 'space-between', 'space-around' ], default: 'flex-start' },
          { key: 'alignItems', selectList: [ 'flex-start', 'flex-end', 'center', 'baseline', 'stretch' ], default: 'stretch' },
          { key: 'alignContent', selectList: [ 'flex-start', 'flex-end', 'center', 'baseline', 'stretch' ], default: 'stretch' },
        ],
        c: [
          { key: 'order', selectList: [], default: 0, type: 'number' },
          { key: 'flexGrow', selectList: [], default: 0, type: 'number' },
          { key: 'flexShrink', selectList: [], default: 1, type: 'number' },
          { key: 'flexBasis', selectList: [], default: 'auto', type: 'px' },
          { key: 'flex', selectList: [], default: '', type: 'double', double: [ 'flexGrow', 'flexShrink', 'flexBasis' ] },
          { key: 'alignSelf', selectList: [ 'flex-start', 'flex-end', 'center', 'baseline', 'stretch', 'auto' ], default: 'auto' },
        ]
      }
    }
  },
  computed: {
    // contentStyleValue: function() {
    //   console.log(this.contentStyle)
    //   let temp = this.contentStyle.map((data)=>{
    //     data = { data[key]: data[value] }
    //     return data
    //   })
    //   return temp
    // }
  },
  watch: {
    // x: function(val) {}
  },
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    createItem () {
      const item = { order: null, flexGrow: null, flexShrink: null, flexBasis: null, flex: null, alignSelf: null }
      this.contentStyleObj.children.push(item);
    },
    resetItem () {
      const item = { order: null, flexGrow: null, flexShrink: null, flexBasis: null, flex: null, alignSelf: null }
      const fitem = { flexDirection: null, flexWrap: null, flexFlow: null, justifyContent: null, alignItems: null, alignContent: null };
      this.contentStyleObj.father = fitem;
      this.contentStyleObj.children = []
      this.contentStyleObj.children.push(item);
    },
    formatKey (str) {
      return str.replace(/[A-Z]/g, (match)=>{
        return `-${match.toLowerCase()}`;
      })
    },
    checkFSelect (pkey, v, defaultV) {
      let temp = this.contentStyleObj.father;
      return temp[pkey] !== null ? temp[pkey] === v : defaultV === v;
    },
    checkItemChoose (item) {
      return item === this.chooseItemObj;
    },
    styleFValueClicked (pkey, v) {
      let temp = this.contentStyleObj.father;
      temp[pkey] = v;
      this.contentStyleObj.father = JSON.parse(JSON.stringify(temp));
    },
    getDoubleFItemValue (double) {
      let value = ''
      const buf = this.contentStyleObj.father;
      for (let item of double) {
        if (buf[item] === null) {
          let temp = this.styleSchema.f.filter((_)=>{ return _.key === item })
          value += `${temp[0].default} `;
        } else {
          value += `${buf[item]} `;
        }
      }
      return value;
    },
    closeDialogF () {
      this.showContentSetDialog = false
    },
    closeDialogC () {
      this.showItemSetDialog = false;
      this.chooseItemObj = null;
    },
    deleteItem (item, index) {
      this.contentStyleObj.children.splice(index, 1);
    },
    itemClicked (item, index) {
      this.showItemSetDialog = true
      this.chooseItemObj = item
    }
  }
}
