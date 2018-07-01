<%@page import="apps.library.commons.components.widgets.multifield.MultifieldModel" %>
<%@include file="/libs/foundation/global.jsp"%>
<%
	MultifieldModel model = new MultifieldModel(resource, slingRequest);
	pageContext.setAttribute("model", model, PageContext.REQUEST_SCOPE);
%>
${model}-ryan008