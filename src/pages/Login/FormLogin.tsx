import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';
import {Eye, EyeOff} from 'lucide-react';
import {NavLink} from 'react-router';
import {useLoginForm} from './UseLoginForm';

export const FromLogin = () => {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    isSuccess,
    isError,
    showPassword,
    togglePasswordVisibility,
    setValue,
  } = useLoginForm();

  return (
    <div>
      {/* Success/Error Messages */}
      {isSuccess && (
        <div className="mb-6 p-4 bg-background border  rounded-lg">
          <p className="text-chart-2 text-sm font-medium">
            Login successful! Redirecting...
          </p>
        </div>
      )}

      {isError && (
        <div className="mb-6 p-4 bg-background border rounded-lg">
          <p className="text-chart-1text-sm font-medium">
            Login failed. Please check your credentials and try again.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email..."
            className="h-14 text-base rounded-xl border-border focus:border-primary"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-chart-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password..."
              className="h-14 text-base rounded-xl pr-12"
              {...register('password')}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
              onClick={togglePasswordVisibility}>
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Eye className="w-5 h-5 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-chart-1">{errors.password.message}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            defaultChecked={true}
            onCheckedChange={(checked) => setValue('terms', checked as boolean)}
          />
          <div className="space-y-1">
            <Label
              htmlFor="terms"
              className="text-sm text-muted-foreground font-normal cursor-pointer">
              I agree to OnSchedule's{' '}
              <span className="text-primary underline">Terms of Use</span> and
              acknowledge our{' '}
              <span className="text-primary underline">Privacy Policy</span>.
            </Label>
            {errors.terms && (
              <p className="text-sm text-chart-1">{errors.terms.message}</p>
            )}
          </div>
        </div>

        {/* Log In Button */}
        <Button
          type="submit"
          // disabled={isLoading}
          className="w-full h-14 text-lg font-medium bg-primary hover:bg-primary/80 rounded-xl shadow-lg transition-all disabled:opacity-50 text-white">
          {isLoading ? 'Logging In...' : 'Log In'}
        </Button>

        <div className="text-center">
          <NavLink
            to={'/forgot-password'}
            className="text-sm text-primary font-medium hover:underline">
            Forgot your password?
          </NavLink>
        </div>
      </form>
    </div>
  );
};
