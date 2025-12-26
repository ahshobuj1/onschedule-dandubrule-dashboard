import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from '@/features/auth/authApi';
import {useState, useEffect, useMemo} from 'react';
import {toast} from 'sonner';
import {getErrorMessage} from '@/utils/getErrorMessage';

const updateProfileSchema = z.object({
  firstName: z.string().min(2).max(100).trim().optional(),
  lastName: z.string().min(2).max(100).trim().optional(),
  bio: z.string().max(500).trim().optional(),
  instagramUrl: z.url().trim().optional(),
  avatarUrl: z.url().trim().optional(),
});

type UpdateProfileForm = z.infer<typeof updateProfileSchema>;

export default function ProfileForm() {
  const {data: profileData, isLoading: loadingProfile} =
    useProfileQuery(undefined);

  console.log('[profileData]:  ', profileData);

  const [updateProfile, {isLoading: isUpdating}] = useUpdateProfileMutation();
  const profile = useMemo(() => profileData?.data || null, [profileData]);
  console.log(profile);
  console.log(profileData);

  const [avatarPreview, setAvatarPreview] = useState(profile?.avatarUrl || '');
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      bio: '',
      instagramUrl: '',
      avatarUrl: '',
    },
  });

  // Prefill form when profile loads
  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        bio: profile.bio || '',
        instagramUrl: profile.instagramUrl || '',
        avatarUrl: profile.avatarUrl || '',
      });
      setAvatarPreview(profile.avatarUrl || '');
    }
  }, [profile, form]);

  // Request upload URL and upload file to S3
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const payload = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/content/get-public-upload-url`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // adjust auth if needed
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error('Failed to get upload URL');
      const data = await res.json();
      const {uploadUrl, url} = data.data;

      // Upload file directly to S3
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) throw new Error('Upload to S3 failed');

      // Update preview and form value
      setAvatarPreview(url);
      form.setValue('avatarUrl', url);

      toast.success('Image uploaded successfully!');
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: UpdateProfileForm) => {
    try {
      await updateProfile(values).unwrap();
      toast.success('Profile updated successfully!');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  if (loadingProfile) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card className="shadow-lg rounded-xl border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Your Profile</CardTitle>
          <CardDescription>
            Update your details and profile picture.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24 rounded-full">
                <AvatarImage src={avatarPreview} alt="User avatar" />
                <AvatarFallback>
                  {profile?.firstName?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="w-full flex flex-col items-center space-y-2">
                <Label htmlFor="avatar">Upload new profile picture</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
                {isUploading && (
                  <p className="text-xs text-muted-foreground">Uploading...</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...form.register('firstName')} />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...form.register('lastName')} />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                className="resize-none"
                {...form.register('bio')}
              />
              {form.formState.errors.bio && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.bio.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <Input id="instagramUrl" {...form.register('instagramUrl')} />
              {form.formState.errors.instagramUrl && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.instagramUrl.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isUpdating || isUploading}>
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
