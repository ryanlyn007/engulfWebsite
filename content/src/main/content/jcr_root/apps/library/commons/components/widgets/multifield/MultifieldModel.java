package apps.library.commons.components.widgets.multifield;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;

import com.adobe.granite.ui.components.Field;
import com.adobe.granite.ui.components.Value;
import com.google.inject.Inject;

public class MultifieldModel {

	@Inject
	public MultifieldModel(Resource multifield, SlingHttpServletRequest request) {
		ResourceResolver resourceResolver = request.getResourceResolver();
		String contentPath = getContentPath(request);
		Resource contentResource = resourceResolver.getResource(contentPath);
		String multifieldName = multifield.adaptTo(ValueMap.class).get("name", String.class);

		ValueMap vm = new ValueMapDecorator(new HashMap<String, Object>());
		Object[] array = getValueMaps(contentResource, multifieldName);
		vm.put("value", array);
		request.setAttribute(Field.class.getName(), vm);
	}

	private String getContentPath(SlingHttpServletRequest request) {
		String attributeContentPath = (String) request.getAttribute(Value.CONTENTPATH_ATTRIBUTE);
		return attributeContentPath != null ? attributeContentPath : request.getRequestPathInfo().getSuffix();
	}

	private Object[] getValueMaps(Resource contentResource, String multifieldName) {
		Object[] array = new Object[0];

		if (contentResource != null) {
			Resource parent = contentResource.getChild(multifieldName);
			if (parent != null) {
				List<Object> valueMapsList = new LinkedList<Object>();
				Iterator<Resource> children = parent.listChildren();
				while (children.hasNext()) {
					Resource child = children.next();
					valueMapsList.add(child.adaptTo(ValueMap.class));
				}
				array = valueMapsList.toArray(new Object[] {});
			}
		}

		return array;
	}

}
