import loginImage from '@/assets/photo_2025-12-13_06-28-16-removebg-preview.png';
import {FromLogin} from './FormLogin';

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-primary/10 py-12 lg:py-20 flex flex-col items-center justify-center">
      {/* <RouteLoadingIndicator /> */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center">
          {/* Left: Login Form */}
          <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                Log In
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                <span className="text-primary">Welcome</span> back to the
                <span className="text-primary">
                  {' '}
                  OnSchedule Admin Dashboard
                </span>
                . Log in to efficiently manage{' '}
                <span className="font-medium">users</span>,
                <span className="font-medium">clients</span>,{' '}
                <span className="font-medium">employees</span>, and{' '}
                <span className="font-medium">plans</span>. Monitor system
                operations, track performance, and oversee all activities
                securely from a single platform.
              </p>
            </div>

            <FromLogin />
          </div>

          {/* Right: Illustration */}
          <div className="hidden lg:flex justify-center">
            <img
              src={loginImage}
              alt="Team working together on compliance"
              width={650}
              height={650}
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
