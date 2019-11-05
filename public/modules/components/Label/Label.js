import Template from "./Label.html";

const toggleActiveMixin = {
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: false,
      default: "default"
    }
  },
  //   created() {
  //     this.active = true;
  //   },
  computed: {
    labelTypeClass() {
      return `--${this.type}`;
    },
    statusStyle() {
      return {
        fontWeight: this.active ? "bold" : "normal"
      };
    }
  },
  methods: {
    toggle() {
      this.active = !this.active;
    }
  }
};

export const Label = {
  template: Template,
  props: ["color", "backgroundColor"],
  mixins: [toggleActiveMixin],
  computed: {
    elementStyle() {
      return {
        color: this.color || "inherit",
        backgroundColor: this.backgroundColor || "inherit"
      };
    }
  }
};

export default Label;
