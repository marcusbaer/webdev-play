export const Marquee = {
  template: `<div class="r-marquee" :style="elementStyle"><marquee><slot>...place your message in the tag...</slot></marquee></div>`,
  props: ["color", "backgroundColor"],
  computed: {
    elementStyle() {
      return {
        color: this.color || "inherit",
        backgroundColor: this.backgroundColor || "inherit"
      };
    }
  }
};

export default Marquee;
