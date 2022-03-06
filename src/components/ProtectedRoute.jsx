import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function ProtectedRoute({ user, isPrivate, children }) {
  const redirectTo = isPrivate ? "/login" : "/search";

  if ((user && isPrivate) || (!user && !isPrivate)) {
    return <>{children}</>;
  } else {
    return <Navigate to={redirectTo} />;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
