// ** Menu Components Imports
import HorizontalNavMenuLink from './HorizontalNavMenuLink'
import HorizontalNavMenuGroup from './HorizontalNavMenuGroup'
import { resolveHorizontalNavMenuItemComponent as resolveNavItemComponent } from '@layouts/utils'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const HorizontalNavMenuItems = (props) => {
  const authData = useSelector((state) => state.auth.userData)
  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink,
  }

  // ** Render Nav Items
  const RenderNavItems = props.items.map((item, index) => {
    if (
      item.restrictedTo &&
      !_.get(item.restrictedTo, 'role', []).includes(authData.role)
    ) {
      return
    }
    const TagName = Components[resolveNavItemComponent(item)]

    return <TagName item={item} index={index} key={item.id} {...props} />
  })

  return RenderNavItems
}

export default HorizontalNavMenuItems
