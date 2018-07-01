package apps.library.commons.components.widgets.compositeSection;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;

import com.adobe.granite.ui.components.Value;
import com.google.inject.Inject;

public class CompositeSectionModel {

	public static final String ITEM_NAME_PROPERTY = "name";

	private final ValueMap original;

	private final Map<Resource, ValueMap> valueMapForResources;

	private ValueMap fieldValues;

	@Inject
	public CompositeSectionModel(Resource compositeWidget, SlingHttpServletRequest request) {
		this.original = (ValueMap) request.getAttribute(Value.FORM_VALUESS_ATTRIBUTE);
		if (!isMultifieldTemplateRequest()) {
			Iterator<Entry<String, Object>> it = original.entrySet().iterator();
			if (it.hasNext()) {
				Entry<String, Object> wrapper = it.next();
				fieldValues = (ValueMap) wrapper.getValue();
			}
		}
		this.valueMapForResources = constructValueMapForChildResources(compositeWidget);
	}

	public Map<Resource, ValueMap> getValueMap() {
		return valueMapForResources;
	}

	public ValueMap getOriginal() {
		return original;
	}

	private boolean isMultifieldTemplateRequest() {
		return original == null;
	}

	private Map<Resource, ValueMap> constructValueMapForChildResources(Resource compositeWidget) {
		Map<Resource, ValueMap> result = new LinkedHashMap<>();
		Iterator<Resource> children = compositeWidget.getChild("items").listChildren();
		while (children.hasNext()) {
			Resource item = children.next();
			String name = item.adaptTo(ValueMap.class).get(ITEM_NAME_PROPERTY, String.class);
			ValueMapDecorator valueMap = new ValueMapDecorator(new LinkedHashMap<String, Object>());
			if (fieldValues != null) {
				String value = fieldValues.get(name, String.class);
				valueMap.put(name, value);
			}
			result.put(item, valueMap);
		}
		return result;
	}

}
