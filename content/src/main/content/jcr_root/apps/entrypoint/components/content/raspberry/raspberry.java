package apps.entrypoint.components.content.raspberry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;

import com.adobe.cq.sightly.WCMUsePojo;

public class Raspberry extends WCMUsePojo {

    public static final Logger log = LoggerFactory.getLogger(Raspberry.class);

    public static final String RASPBERRY_URL = "raspberryurl";

    private String raspberryurl;

    @Override
    public void activate() throws Exception {
        Resource resource = getResource();
        ValueMap properties = getProperties();
        raspberryurl = properties.get(RASPBERRY_URL, "#");
        //if (StringUtils.isNotEmpty(raspberryurl) && !"#".equals(raspberryurl)) {
        //    raspberryurl = raspberryurl;
        //}
        log.debug("raspberryurl: {}", raspberryurl);
    }

    public String getRaspberryurl() {
        return raspberryurl;
    }
}