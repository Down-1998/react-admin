// import React from 'react'

// export default function unpublished() {
//   return (
//     <div>unpublished</div>
//   )
// }

import NewsPublish from '@/components/publishManage/NewsPublish'
import usePublish from '@/components/publishManage/usePublish'
import {Button} from 'antd'

export default function Unpublished() {
    // 1=== 待发布的
    const {dataSource,handlePublish} = usePublish(1)

    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id)=><Button type="primary" onClick={()=>handlePublish(id)}>
                发布
            </Button>} ></NewsPublish>
        </div>
    )
}
