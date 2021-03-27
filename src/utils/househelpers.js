export const houseHelpers = () => {
  if (_isRoomTwo) {
    props.setRouteLocation(
      {
        ...props.routeLocation,
        isHome: false,
        isRoomTwo: true,
      },
      [_isRoomTwo]
    );
  }
  if (_isRoomOne) {
    props.setRouteLocation(
      {
        ...props.routeLocation,
        isHome: false,
        isRoomOne: true,
      },
      [_isRoomOne]
    );
  }
  if (_isAttic) {
    props.setRouteLocation(
      {
        ...props.routeLocation,
        isHome: false,
        isAttic: true,
      },
      [_isAttic]
    );
  }
  if (_isLivingRoom) {
    props.setRouteLocation(
      {
        ...props.routeLocation,
        isHome: false,
        isLivingRoom: true,
      },
      [_isLivingRoom]
    );
  }
  if (_isBackroom) {
    props.setRouteLocation(
      {
        ...props.routeLocation,
        isHome: false,
        isBackroom: true,
      },
      [_isBackroom]
    );
  }
};
