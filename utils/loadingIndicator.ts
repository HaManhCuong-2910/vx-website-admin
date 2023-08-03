import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = useRouter();

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  next();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
